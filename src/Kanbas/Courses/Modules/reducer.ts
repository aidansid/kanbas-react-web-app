import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modules: [],
};
const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, { payload: module }) => {
      const newModule: any = {
        _id: module._id,
        name: module.name,
        course: module.course,
        lessons: [],
      };
      state.modules = [...state.modules, newModule] as any;
    },
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter(
        (m: any) => m._id !== moduleId);
    },
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
    },
    setModules: (state, action) => {
      state.modules = action.payload;
    },
  },
});
export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;