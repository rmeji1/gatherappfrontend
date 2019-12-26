import * as Type from './actionTypes'

export const addInvitations = (invitations) => ({
  type: Type.ADD_INVITATIONS,
  invitations
})

export const addInvitation = (invitation) => ({
  type: Type.ADD_INVITATION,
  invitation
})