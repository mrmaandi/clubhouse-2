import { InputText } from 'primereact/inputtext'

const TopBar = (): JSX.Element => {
  return (
    <>
      <div
        className="flex flex-wrap align-items-center px-5 h-5rem"
        style={{ gap: 20 }}
      >
        <div className='flex align-items-center' style={{ gap: 8 }}>
          <h2 className="my-0">Playlists</h2>
          <h4>BETA</h4>
        </div>
      
      </div>
    </>
  );
};

export default TopBar;
