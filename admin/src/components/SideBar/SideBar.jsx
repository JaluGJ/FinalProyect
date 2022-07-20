import './SideBar.scss';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";


export default function SideBar({logout}) {
    return (
        <div className='sidebar'>
            <div className="items">
                <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="avatar" className="avatar" />
            </div>
                <div className="itemsIcons">
                    <div className="item">
                    <DarkModeOutlinedIcon className='icon'/>            
                    </div>
                    <div className="item">
                    <LightModeOutlinedIcon className='icon'/>
                    </div>
                    <div className="item">
                    <NotificationsIcon className='icon'/>
                    </div>
                </div>
            <div className="top">
                <span className="logo">ADMIN PANEL</span>
            </div>

            <hr />

            <div className="center">
                <ul>
                    <p className="title">LISTADO</p>
                    <Link to="/usuarios" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlinedIcon className='icon' />
                            <span>Usuarios</span>
                        </li>
                    </Link>
                    <Link to="/products" style={{ textDecoration: "none" }}>
                        <li>
                            <StoreMallDirectoryOutlinedIcon className='icon' />
                            <span>Productos</span>
                        </li>
                    </Link>
                    <li>
                        <CreditCardOutlinedIcon className='icon' />
                        <span>Ordenes</span>
                    </li>
                    <li>
                        <LocalShippingOutlinedIcon className='icon' />
                        <span>Envios</span>
                    </li>

                    <p className="title">ESTADISTICAS</p>
                    <li>
                        <SignalCellularAltIcon className='icon' />
                        <span>Graficos</span>
                    </li>
                    <li>
                        <NotificationsNoneOutlinedIcon className='icon' />
                        <span>Alertas</span>
                    </li>

                    <p className="title">USUARIO</p>
                    <li>
                        <AccountCircleOutlinedIcon className='icon' />
                        <span>Perfil</span>
                    </li>
                    <li>
                        <LogoutOutlinedIcon className='icon' />
                        <span onClick={logout}>Desconectarse</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}