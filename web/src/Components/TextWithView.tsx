const TextWithView = ({ data, setLastInputChoosen, action, input}) => {
	return (
    	<div onClick={() => setLastInputChoosen({actionTitle: action['title'], inputTitle: input})} style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'blue', alignItems: 'center', height: 30, paddingLeft: '2%'}}>
		    {data.map((item, index) => {
		        if (item.type === 'text') {
			        return <div key={index}>{item.content}</div>;
		        } else if (item.type === 'image') {
			        return <img key={index} src={item.content} style={{ width: 20, height: 20 }} />;
                } else if (item.type === 'view') {
                    return <div key={index} style={{marginLeft: '3%', marginRight: '3%'}}>{item.content}</div>;
                }
	    	})}
	    </div>
	);
};

export default TextWithView