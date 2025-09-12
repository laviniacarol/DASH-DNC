import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CreateProfileData } from '../../types/profileData'

const initialState: Omit<CreateProfileData, 'name' | 'phone' | 'password'> = {
  email: '',
  message: null,
}

const profilesSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (
      state,
      action: PayloadAction<Omit<CreateProfileData, 'name' | 'phone' | 'password'>>
    ) => {
      state.email = action.payload.email
    },
    setMessage: (state, action: PayloadAction<string | null>) => {
      state.message = action.payload
    },
  },
})

export const { setProfileData, setMessage } = profilesSlice.actions
export default profilesSlice.reducer
