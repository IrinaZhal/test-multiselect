import { Multiselect, OptionType } from '@shared/ui/multiselect/multiselect';
import styles from './app.module.css';
import { useEffect, useState } from 'react';
import { TagList } from '@shared/ui/tags-list/tag-list';
import { getOptionsApi } from '@shared/assets/api/api';


function App() {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [options, setOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    getOptionsApi()
      .then((data) => setOptions(data))
      .catch((err) => {
        console.error('Ошибка при загрузке опций:', err);
      });
  }, []);

  const handleRemoveTag = (value: string) => {
  setSelectedOptions(prev =>
    prev.filter(option => option.value !== value)
  );
};

  return (
    <div className={styles.page}>
      <TagList onRemove={handleRemoveTag} selectedOptions={selectedOptions}/>
      <Multiselect
        options={options}
        selectedOptions={selectedOptions}
        onSelectionChange={newSelectedOptions =>
          setSelectedOptions(newSelectedOptions)
        }
      />
    </div>
  );
}

export default App;
