import err from  './error.jpg';

function Error(){
    return(
        <div className="alert alert-danger">
            <img src={err} alt="No image for you. Get lost!!"/>
            <br/>
            <img src="https://th.bing.com/th?id=OIP.yYBFzWZ0R970KK2bJhwO9AHaEi&w=319&h=195&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" alt="No image for you. Get lost!!"/>
            
            No such route is up right now
        </div>
    );

}

export default Error;