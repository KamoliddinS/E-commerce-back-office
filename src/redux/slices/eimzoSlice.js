import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import EIMZO from '../../helpers/Eimzo';

export const installEimzoAndListAllUserKeys = createAsyncThunk('user/getCertificates', async () => {
    const eimzo = new EIMZO();
    const data = await eimzo.install();
    const certificates = await eimzo.listAllUserKeys();
    // extract important fields from certificates
    const certificatesData = certificates.map((certificate) => {
        console.log(certificate);
      const { CN, O, PINFL, T, TIN, UID, alias, disk, name, path, serialNumber, type, validFrom, validTo } = certificate;
      return {
        CN,
        O,
        PINFL,
        T,
        TIN,
        UID,
        alias,
        disk,
        name,
        path,
        serialNumber,
        type,
        validFrom: JSON.stringify(validFrom),
        validTo: JSON.stringify(validTo)
      };
    });
  
    return certificatesData;
  });
  
  // export async function installEimzoAndListAllUserKeys() {
  //   const eimzo = new EIMZO();
  //   const data = await eimzo.install();
  //   const certificates = await eimzo.listAllUserKeys();
  //   console.log(certificates);
  //   return certificates;
  // }

  const eimzoSlice = createSlice({
    name: 'eimzoSlice',
    initialState: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
      certificates: [],
    },
    reducers: {
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder
        .addCase(installEimzoAndListAllUserKeys.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(installEimzoAndListAllUserKeys.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.certificates = action.payload;
        })
        .addCase(installEimzoAndListAllUserKeys.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
    },
  });
  
  
  export default eimzoSlice.reducer;
  