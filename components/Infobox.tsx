const InfoBox = ({
  heading,
  backGroundColor,
  textColor = "text-gray-800",
  buttonInfo,
  children,
}: {
  heading: string;
  backGroundColor: string;
  textColor?: string;
  buttonInfo: {
    text: string;
    link: string;
    backgroundColor: string;
  };
  children: string;
}) => {
  return (
    <div className={`${backGroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>
      <a
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {buttonInfo.text}
      </a>
    </div>
  );
};

export default InfoBox;
