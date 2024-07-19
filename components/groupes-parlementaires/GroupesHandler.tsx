"use client";

import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { Spinner } from "@nextui-org/spinner";
import { Button, ButtonGroup, Card, Skeleton, Spacer, Switch } from '@nextui-org/react';

import {
  GetGroupesFromSupabase,
  UpdateGroupeParlementaireToSupabase,
} from '../../lib/supabase/groupes-parlementaires/DataResolver';
import GroupeGrid from './GroupeGrid';

function UpdateGroupeParlementaireFromArray(
  groupes: Types.Canonical.GroupeParlementaire[],
  sigle: string,
  updatedGroupe: Types.Canonical.GroupeParlementaire,
) {
  const newGroupes = groupes.map((gp) => {
    if (gp.Sigle === sigle) {
      return updatedGroupe;
    } else {
      return gp;
    }
  });
  return newGroupes;
}

function RemoveGroupeParlementaireFromArray(
  groupes: Types.Canonical.GroupeParlementaire[],
  sigle: string,
) {
  return groupes.filter((gp) => gp.Sigle !== sigle);
}

async function UpdateRemoteGroupes(localGroupes) {
  const remoteGroupes = await GetGroupesFromSupabase();

  if(remoteGroupes === null) {
    throw new Error('Remotes groups are null');
  }

  return localGroupes.map(async (gp) => {
    const foundGroupe = remoteGroupes.find((rgp) => gp.Sigle === rgp.Sigle);
    if (foundGroupe) {
      return await UpdateGroupeParlementaireToSupabase(gp);
    }
    return gp;
  });
}

export default function GroupesHandler() {
  const [IsLoading, setIsLoading] = useState(true);
  const [GroupesParlementaires, setGroupesParlementaires] = useState<
    Types.Canonical.GroupeParlementaire[]
  >([]);
  const [DisplayInactiveGroupes, setDisplayInactiveGroupes] = useState(false);

  useEffect(() => {
    GetGroupesFromSupabase().then((data) => {
      if(data === null) {
        throw new Error('No data');
      }

      setGroupesParlementaires(data);
      setIsLoading(false);
    });
  }, []);

  const updateRemoteFunction = () => {
    setIsLoading(true);
    UpdateRemoteGroupes(GroupesParlementaires)
      .then((promises) => Promise.all(promises))
      .then((data) => {
        setIsLoading(false);
        return data;
      });
  };

  return IsLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner size='lg'/>
    </div>
  ) : (
    <>
      <div className="flex justify-between flex-col md:flex-row">
        <ButtonGroup>
          <Button
            aria-label="Update staging"
            onClick={() => updateRemoteFunction()}
            color='primary'
          >
            Update staging
            <FaArrowUp />
          </Button>
          <Button
            aria-label="Update production"
            color='primary'
            isDisabled
          >
            Update production
            <FaArrowUp />
          </Button>
        </ButtonGroup>

        <Switch 
          aria-label="Display inactive groups"
          isSelected={DisplayInactiveGroupes}
          onValueChange={setDisplayInactiveGroupes}
        />
      </div>

      <Spacer y={4} />

      <GroupeGrid
        GroupesParlementaires={GroupesParlementaires.filter(
          (gp) => gp.Actif || (DisplayInactiveGroupes && !gp.Actif),
        )}
        UpdateFn={(gp) => {
          setGroupesParlementaires(
            UpdateGroupeParlementaireFromArray(GroupesParlementaires, gp.Sigle, gp),
          );
        }}
        RemoveFn={(id) => {
          setGroupesParlementaires(RemoveGroupeParlementaireFromArray(GroupesParlementaires, id));
        }}
      />
    </>
  );
}
