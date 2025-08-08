import type { Character } from './character';
import type { GameState, CharacterActions, PartyPositionName } from './types';

type InitializeAction = {
  type: 'init';
  payload: GameState;
};
type AddPartyMemberAction = {
  type: 'ADD_PARTY_MEMBER';
  payload: {
    position: PartyPositionName;
    character: Character<CharacterActions>;
  };
};
type RemovePartyMemberAction = {
  type: 'REMOVE_PARTY_MEMBER';
  payload: {
    position: PartyPositionName;
  };
};
type SetPartyMemberStateAction = {
  type: 'SET_PARTY_MEMBER_STATE';
  payload: {
    position: PartyPositionName;
    newState: CharacterActions;
  };
};
type MovePartyMemberAction = {
  type: 'MOVE_PARTY_MEMBER';
  payload: {
    from: PartyPositionName;
    to: PartyPositionName;
  };
};

export type GameReducerAction =
  | InitializeAction
  | AddPartyMemberAction
  | RemovePartyMemberAction
  | SetPartyMemberStateAction
  | MovePartyMemberAction;

export function gameReducer(
  state: GameState,
  action: GameReducerAction,
): GameState {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        party: action.payload.party,
        availableCharacters: action.payload.availableCharacters,
      };
    case 'ADD_PARTY_MEMBER':
      return {
        ...state,
        party: {
          ...state.party,
          [action.payload.position]: action.payload.character,
        },
        availableCharacters: state.availableCharacters.filter(
          (character) => character.id !== action.payload.character.id,
        ),
      };
    case 'REMOVE_PARTY_MEMBER':
      return {
        ...state,
        party: {
          ...state.party,
          [action.payload.position]: null,
        },
      };
    case 'SET_PARTY_MEMBER_STATE':
      return {
        ...state,
        party: {
          ...state.party,
          [action.payload.position]: {
            ...state.party[action.payload.position],
            state: action.payload.newState,
          },
        },
      };
    case 'MOVE_PARTY_MEMBER': {
      const fromCharacter = state.party[action.payload.from];
      const toCharacter = state.party[action.payload.to];
      if (action.payload.from == 'pos1' && action.payload.to == 'pos4') {
        if (state.party.pos4 === null) {
          return {
            ...state,
            party: {
              ...state.party,
              pos4: fromCharacter,
              pos1: null,
            },
          };
        }

        return {
          ...state,
          party: {
            pos1: state.party.pos2,
            pos2: state.party.pos3,
            pos3: state.party.pos4,
            pos4: fromCharacter,
          },
        };
      } else if (action.payload.from == 'pos4' && action.payload.to == 'pos1') {
        if (state.party.pos1 === null) {
          return {
            ...state,
            party: { ...state.party, pos1: fromCharacter, pos4: null },
          };
        }
        return {
          ...state,
          party: {
            pos1: fromCharacter,
            pos2: state.party.pos1,
            pos3: state.party.pos2,
            pos4: state.party.pos3,
          },
        };
      }
      return {
        ...state,
        party: {
          ...state.party,
          [action.payload.from]: toCharacter,
          [action.payload.to]: fromCharacter,
        },
      };
    }

    default:
      return state;
  }
}
