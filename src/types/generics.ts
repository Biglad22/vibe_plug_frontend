export type SelectOption =
    | string
    | {
          label: string;
          value: string | number;
          disabled?: boolean;
      };