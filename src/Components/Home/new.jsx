
function New(props) {
    console.log(props.new);
    console.log(props.cate);
    return (
        <>
            {props.new.map((news, index) => (
                <div key={index} className="flex-new">
                    <h3 id="h2text"  className="time">{news.date}</h3>
                    <img src="https://cdn.sancarlosdigital.com/wp-content/uploads/2023/03/maquina-trituradora-696x464.jpg.webp" alt=""></img>
                    <h2 id="h2text" href="">{news.title}</h2>
                    {props.cate.map((category)=>(
                        category._id===news.category_id?                       
                        <p className="category">{category.name}</p>
                        :null
                    ))}                   
                    <p>{news.short_description}</p>
                    <a href={news.permalink}>Ver Noticia</a>
                </div>
            ))}
        </>
    )
}
export default New;