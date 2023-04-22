export default function PageTitle(props) {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <h1 style={{color: '#D3DCFF', fontSize: '325%', fontFamily: 'Amoreiza'}}>{props.children}</h1>
        </div>
    )
}