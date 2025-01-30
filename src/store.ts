import { create } from "zustand";

type LoanState = {
  principal: number;
  rate: number;
  time: number;
  emi: number;
  formComplete: boolean;
  setPrincipal: (value: number) => void;
  setRate: (value: number) => void;
  setTime: (value: number) => void;
  setEmi: (value: number) => Promise<void>;
  setFormComplete: (value: boolean) => void;
};

type Action = {
  setPrincipal: (principal: LoanState['principal']) => void
  setRate: (principal: LoanState['rate']) => void
  setTime: (principal: LoanState['time']) => void
  setEmi: (principal: LoanState['emi']) => void
  setFormComplete: (principal: LoanState['formComplete']) => void
}

export const useLoanStore = create<LoanState & Action >((set) => ({
  principal: 0,
  rate: 0,
  time: 0,
  emi: 0,
  formComplete: false,
  setPrincipal: (value: number) => {
    console.log('triggered')
    set(() => ({ principal: value }));
  },
  setRate: (value: number) => {
    set(() => ({ rate:value }));
  },
  setTime: (value: number) => {
    set(() => ({ time: value }));
  },
  setEmi: async (value: number) => {
    await new Promise ((resolve) => setTimeout(resolve, 1000));
    set((state) => ({ emi: value }));
  },
  setFormComplete:(value: boolean) => {
    set((state) => ({ formComplete: value }));
  },
}));

export default useLoanStore;
