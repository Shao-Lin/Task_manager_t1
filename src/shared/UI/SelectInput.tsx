import { NativeSelect } from "@mantine/core";

type SelectProps = {
  value: string;
  data: string[];
  placeholder: string;
  onChange: (val: string) => void;
  error?: string | false | undefined;
};

const SelectInput = ({
  value,
  data,
  placeholder,
  onChange,
  error,
}: SelectProps) => {
  const extendedData = [
    { value: "", label: placeholder, hidden: true },
    ...data.map((item) => ({ value: item, label: item })),
  ];

  return (
    <NativeSelect
      data={extendedData}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      mt="md"
      error={error}
    />
  );
};

export default SelectInput;
