export type TabState = 0 | 1 | 2;

interface TabItemProps {
  text: string | JSX.Element;
  isCurrent: boolean;
  onClick: () => any;
}

export const TabItem: React.FC<TabItemProps> = (props) => {
  return (
    <div
      className="relative w-full flex-1 text-center text-md fullscreen:text-lg text-primary-600 transition-colors cursor-pointer hover:bg-primary-100"
      onClick={props.onClick}
    >
      <div className="p-3">{props.text}</div>
      {props.isCurrent && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 bottom-1.5 rounded-full bg-primary-300"
          style={{
            width: "18%",
            height: "2px",
          }}
        />
      )}
    </div>
  );
};
