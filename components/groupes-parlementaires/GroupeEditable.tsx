import { useState, memo } from 'react';
import { Box } from '@chakra-ui/core';
import { ChromePicker } from 'react-color';
import { InputGroup, Input, InputLeftAddon } from '@chakra-ui/core';
import { IconButton } from '@chakra-ui/core';
import Color from 'color';

interface GroupeEditableProps {
  GroupeParlementaire: GroupeParlementaire;
  UpdateFn: Function;
  RemoveFn: Function;
}

interface GroupeParlementaire {
  _id: string;
  Sigle: string;
  NomComplet?: string;
  Couleur?: string;
  CouleurDetail?: CouleurDetail;
  URLImage?: string;
  Ordre?: number;
  Actif?: boolean;
}

interface CouleurDetail {
  HSL: HSLDetail;
  RGB: RGBDetail;
  HEX: string;
}

interface HSLDetail {
  Full: string;
  H: number;
  S: number;
  L: number;
}

interface RGBDetail {
  Full: string;
  R: number;
  G: number;
  B: number;
}

function GroupeEditable(props: GroupeEditableProps) {
  const [IsEditing, setIsEditing] = useState(false);

  return (
    <Box
      borderWidth="2px"
      borderStyle={props.GroupeParlementaire.Actif ? 'solid' : 'dashed'}
      borderColor="lightGray"
      borderRadius="0.3em"
      minHeight="250px"
      p={5}
      // opacity={props.GroupeParlementaire.Actif ? 1 : 0.3}
      backgroundColor={props.GroupeParlementaire.Couleur}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <IconButton
          border="none"
          aria-label="Edit"
          icon={IsEditing ? 'check' : 'settings'}
          onClick={() => {
            setIsEditing(!IsEditing);
          }}
        />

        {/* {IsEditing ? (
          <IconButton
            border="none"
            aria-label="Remove"
            icon="close"
            onClick={() => {
              props.RemoveFn(props.GroupeParlementaire._id);
            }}
          />
        ) : null} */}

        {/* {IsEditing ? (
          <Switch
            isChecked={props.GroupeParlementaire.Actif}
            onChange={() => {
              props.UpdateFn(
                Object.assign({}, props.GroupeParlementaire, {
                  Actif: !props.GroupeParlementaire.Actif,
                })
              );
            }}
          />
        ) : null} */}
      </Box>

      <Box
        style={{
          transition: 'opacity 0.225s linear',
        }}
      >
        <InputGroup mt={4}>
          <InputLeftAddon children="Sigle" />
          <Input
            isReadOnly={true}
            type="text"
            defaultValue={props.GroupeParlementaire.Sigle}
            // onChange={(v) =>
            //   props.UpdateFn(
            //     Object.assign({}, props.GroupeParlementaire, {
            //       Sigle: v.target.value,
            //     })
            //   )
            // }
          />
        </InputGroup>

        <InputGroup mt={4}>
          <InputLeftAddon children="Nom" />
          <Input
            isDisabled={!IsEditing}
            type="text"
            roundedLeft="0"
            defaultValue={props.GroupeParlementaire.NomComplet}
            onChange={(v) =>
              props.UpdateFn(
                Object.assign({}, props.GroupeParlementaire, {
                  NomComplet: v.target.value,
                })
              )
            }
          />
        </InputGroup>

        {IsEditing ? (
          <Box mt={4}>
            <ChromePicker
              defaultView="hsl"
              disableAlpha={true}
              color={props.GroupeParlementaire.Couleur}
              onChange={(v) => {
                const color = Color(v.hex);

                props.UpdateFn(
                  Object.assign({}, props.GroupeParlementaire, {
                    Couleur: color.hsl().string(),
                    CouleurDetail: {
                      HEX: color.hex(),
                      HSL: {
                        Full: color.hsl().string(0),
                        H: Math.round(color.hsl().object().h),
                        S: Math.round(color.hsl().object().s),
                        L: Math.round(color.hsl().object().l),
                      },
                      RGB: {
                        Full: color.rgb().string(0),
                        R: Math.round(color.rgb().object().r),
                        G: Math.round(color.rgb().object().g),
                        B: Math.round(color.rgb().object().b),
                      },
                    },
                  })
                );
              }}
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default GroupeEditable;
