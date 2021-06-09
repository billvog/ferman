export type TabState = 0 | 1 | 2;

interface TabItemProps {
  text: string | JSX.Element;
  isCurrent: boolean;
  onClick: () => any;
}

export const TabItem: React.FC<TabItemProps> = (props) => {
  return (
    <div
      className={`relative flex-grow text-center text-md fullscreen:text-lg text-primary-600 transition-colors duration-100 cursor-pointer ${
        props.isCurrent ? "bg-primary-50" : ""
      } hover:bg-primary-100 whitespace-nowrap`}
      onClick={props.onClick}
    >
      <div className="px-4 py-3">
        <div>
          <span className="flex flex-row items-center justify-center space-x-1">
            {props.text}
          </span>
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
