import { useState } from 'react';
import { ChromePicker } from 'react-color';
import { InputGroup, Input, InputLeftAddon, Box, NumberInput, IconButton } from '@chakra-ui/react';
import Color from 'color';
import { FaCog, FaCheck } from 'react-icons/fa';
import { ScaleFade } from '@chakra-ui/transition';

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
    <ScaleFade initialScale={0.9} in={true}>
      <Box
        border={props.GroupeParlementaire.Actif ? 'none' : '2px dashed lightGray'}
        borderRadius="5px"
        p={5}
        backgroundColor={props.GroupeParlementaire.Couleur}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton
            border="none"
            aria-label="Edit"
            icon={IsEditing ? <FaCheck /> : <FaCog />}
            onClick={() => {
              setIsEditing(!IsEditing);
            }}
          />
        </Box>

        <Box>
          <InputGroup mt={4}>
            <InputLeftAddon children="Sigle" />
            <Input isReadOnly={true} type="text" defaultValue={props.GroupeParlementaire.Sigle} />
          </InputGroup>

          <InputGroup mt={4}>
            <InputLeftAddon children="Nom" />
            <Input
              isDisabled={!IsEditing}
              type="text"
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

          <InputGroup mt={4}>
            <InputLeftAddon children="Ordre" />
            <Input
              isDisabled={!IsEditing}
              type="number"
              defaultValue={props.GroupeParlementaire.Ordre}
              onChange={(v) =>
                props.UpdateFn(
                  Object.assign({}, props.GroupeParlementaire, {
                    Ordre: v.target.value,
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
    </ScaleFade>
  );
}

export default GroupeEditable;
