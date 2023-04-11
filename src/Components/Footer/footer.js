import './footer.css';

function Footer(){
    return(
        <div className="footer">
        <ul className="list">
            <li><a href="">My Cover</a></li>
            <li><a href="">|</a></li>
            <li><a href="">About</a></li>
            <li><a href="">|</a></li>
            <li><a href="">Help</a></li>
        </ul>
        <p className="copyright">
            <i className="fa-solid fa-copyright"></i>
                My News Cover
        </p>
    </div>
    );
}

export default Footer;