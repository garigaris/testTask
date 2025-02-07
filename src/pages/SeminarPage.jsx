import { useGetSeminarsQuery } from "../store/api/seminarApi"
import SeminarItem from "../components/seminarItem/SeminarItem"

const SeminarPage = () => {
    const { data, error, isLoading} = useGetSeminarsQuery()
    if (isLoading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка: {error.error}</div>

    return (
        <div>
                {data ? data.map(itemData => (
                    <SeminarItem data={itemData}/>
                )): <h2>Нету семинаров :(</h2>}
        </div>
    )
}

export default SeminarPage