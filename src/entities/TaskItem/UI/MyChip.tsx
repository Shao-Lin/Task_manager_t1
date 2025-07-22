import { Chip } from "@mantine/core";
import styles from "./MyChip.module.css";
type Props = {
  title: string;
  icon: React.ReactElement;
};

const MyChip = ({ title, icon }: Props) => {
  return (
    <Chip
      icon={<span className={styles.chip_icon}>{icon}</span>}
      checked={true}
      onChange={() => {}}
      color="gray"
      variant="outline"
      size="xs"
    >
      {title}
    </Chip>
  );
};
export default MyChip;
