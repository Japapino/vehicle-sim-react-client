import { create } from "zustand";

type LoanState = {
  principal: number;
  rate: number;
  time: number;
  emi: number;
  formComplete: boolean;
  downPayment: number;
  setPrincipal: (value: number) => void;
  setRate: (value: number) => void;
  setTime: (value: number) => void;
  setEmi: (value: number) => Promise<void>;
  setFormComplete: (value: boolean) => void;
};

type Actions = {
  setPrincipal: (principal: LoanState['principal']) => void
  setRate: (rate: LoanState['rate']) => void
  setTime: (time: LoanState['time']) => void
  setEmi: (emi: LoanState['emi']) => void
  setDownPayment: (downPayment: LoanState['downPayment']) => void
  setFormComplete: (formComplete: LoanState['formComplete']) => void
}

export const useLoanStore = create<LoanState & Actions >((set) => ({
  principal: 0,
  rate: 0,
  time: 0,
  emi: 0,
  formComplete: false,
  downPayment: 0,
  setPrincipal: (value: number) => {
    console.log('triggered')
    set(() => ({ principal: value }));
  },
  setDownPayment: async (value: number) => {
    set(() => ({ downPayment: value }));
  },
  setRate: (value: number) => {
    set(() => ({ rate:value }));
  },
  setTime: (value: number) => {
    set(() => ({ time: value }));
  },
  setEmi: async (value: number) => {
    await new Promise ((resolve) => setTimeout(resolve, 1000));
    set(() => ({ emi: value }));
  },
  setFormComplete:(value: boolean) => {
    set(() => ({ formComplete: value }));
  },
}));

export default useLoanStore;
