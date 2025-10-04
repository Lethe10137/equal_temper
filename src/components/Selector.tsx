import React, { useState, useEffect, useCallback } from "react";
// 导入 CSS Modules 样式
import styles from "./Selector.module.css";

interface BinarySelectorProps {
  /** 选项为 true 时的标签文本 */
  trueLabel: string;
  /** 选项为 false 时的标签文本 */
  falseLabel: string;
  /** 选择变化时的回调函数，将新的选择结果（boolean）传递给父组件 */
  onSelectionChange: (isSelected: boolean) => void;
  /** 初始的选择状态 (可选，默认为 false) */
  initialValue?: boolean;
}

const BinarySelector: React.FC<BinarySelectorProps> = ({
  trueLabel,
  falseLabel,
  onSelectionChange,
  initialValue = false,
}) => {
  // 内部状态，管理当前的选择 (true/false)
  const [isSelected, setIsSelected] = useState<boolean>(initialValue);

  // 当 isSelected 状态变化时，调用父组件的回调函数
  useEffect(() => {
    // 调用父组件的回调函数，返回当前的布尔值结果
    onSelectionChange(isSelected);
  }, [isSelected, onSelectionChange]);

  // 处理点击事件的通用函数
  const handleSelection = useCallback((value: boolean) => {
    setIsSelected(value);
  }, []);

  // 辅助函数：根据状态返回 CSS 类名
  const getClassName = (value: boolean) => {
    let className = styles.optionButton;
    if (isSelected === value) {
      className += ` ${styles.active}`; // 选中时添加 active 类
    }
    return className;
  };

  return (
    <div className={styles.selectorContainer}>
      {/* TRUE 选项按钮 */}
      <button
        className={getClassName(true)}
        onClick={() => handleSelection(true)}
        aria-pressed={isSelected === true} // 提供可访问性信息
      >
        {trueLabel}
      </button>

      {/* FALSE 选项按钮 */}
      <button
        className={getClassName(false)}
        onClick={() => handleSelection(false)}
        aria-pressed={isSelected === false} // 提供可访问性信息
      >
        {falseLabel}
      </button>
    </div>
  );
};

export default BinarySelector;
