export type TabState = 0 | 1 | 2;

interface TabItemProps {
  text: string | JSX.Element;
  isCurrent: boolean;
  onClick: () => any;
}

export const TabItem: React.FC<TabItemProps> = (props) => {
  return (
    <div
      className={`relative w-full flex-1 text-center text-md fullscreen:text-lg text-primary-600 transition-colors duration-100 cursor-pointer ${
        props.isCurrent ? "bg-primary-50" : ""
      } hover:bg-primary-100`}
      onClick={props.onClick}
    >
      <div className="p-3">
        <div>
          <span>{props.text}</span>
          <div
            className={`w-full absolute left-1/2 transform -translate-x-1/2 bottom-0 ${
              props.isCurrent ? "bg-primary-600" : "bg-primary-100"
            }`}
            style={{
              height: "3px",
            }}
          />
        </div>
      </div>
    </div>
  );
};
