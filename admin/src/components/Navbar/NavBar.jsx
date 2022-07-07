import './NavBar.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NavBar(){
    return(
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                <input type="text" placeholder='Buscar...' className="search" />
                <SearchOutlinedIcon/>
            </div>

            <div className="items">
                <div className="item">
                <DarkModeOutlinedIcon className='icon'/>            
                </div>
                <div className="item">
                <LightModeOutlinedIcon className='icon'/>
                </div>
                <div className="item">
                <NotificationsIcon className='icon'/>
                </div>
                <div className="item">
                <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="avatar" className="avatar" />
                </div>
            </div>

            </div>
        </div>
    )
}