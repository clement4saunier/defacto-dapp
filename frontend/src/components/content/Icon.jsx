export default function Icon({ material, crypto, className, ...props }) {
  return (
    <>
      {material ? (
        <i>
          <span {...props} className={"material-icons " + className}>
            {material}
          </span>
        </i>
      ) : (
        <i {...props} className={"cfu-" + crypto + " " + className} />
      )}
    </>
  );
}
