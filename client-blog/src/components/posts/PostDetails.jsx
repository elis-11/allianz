import { useParams } from 'react-router-dom'
import { useDataContext } from '../../context/DataProvider'

export const PostDetails = () => {

const { posts}= useDataContext()

const {id}= useParams()
console.log(id);

  return (
<div className="Details">
    Post Details {id}
</div>
  )
}
