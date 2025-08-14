import { OptionType } from "@shared/ui/multiselect/multiselect";

export const getOptionsApi = async (): Promise<OptionType[]> => {
  try {
    const res = await fetch('https://timeapi.io/api/timezone/availabletimezones');
    if (!res.ok) {
      const err = await res.json();
      return Promise.reject(err);
    }
    const data: string[] = await res.json();

    return data.map((tz) => ({
      label: tz,
      value: tz,
    }));
  } catch (error) {
    return Promise.reject(error);
  }
};