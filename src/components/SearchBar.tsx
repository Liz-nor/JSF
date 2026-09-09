import type { ChangeEvent } from 'react';

interface TagsFilterProps {
  tags: string[];
  selectedTag: string;
  onTagChange: (tag: string) => void;
}

function TagsFilter({ tags, selectedTag, onTagChange }: TagsFilterProps) {
  const handleTagChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onTagChange(event.target.value);
  };

  return (
    <div>
      <select value={selectedTag} onChange={handleTagChange}>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TagsFilter;
