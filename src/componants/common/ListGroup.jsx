import React from "react";

const ListGroup = ({
  items,
  onItemSelect,
  selectedItem,
  valueProperty,
  textProperty,
}) => {
  return (
    <div className="ms-5 mt-3">
      <ul class="list-group">
        {items.map((item) => (
          <li
            class={
              item[valueProperty] === selectedItem[valueProperty]
                ? "list-group-item cursor-pointer active"
                : "list-group-item cursor-pointer"
            }
            key={item[valueProperty]}
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroup;
