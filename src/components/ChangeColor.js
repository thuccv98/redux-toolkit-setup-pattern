import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeColor } from '../features/themeSlice';

const ChangeColor = () => {
  // state này chỉ sử dụng cho nội bộ component này nên không cần lưu vào redux store
  // Những state mà được share ở global, ở nhiều component thì nên lưu vào redux store
  const [color, setColor] = useState('');

  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setColor(e.target.value);
        }}
      />
      <button
        onClick={() => {
          dispatch(changeColor(color));
        }}
      >
        Change Color
      </button>
    </div>
  );
};

export default ChangeColor;
