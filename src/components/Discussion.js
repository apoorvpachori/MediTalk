import { useParams, useNavigate } from 'react-router'
import { firestore } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';


export default function Discussion() {
    let navigate = useNavigate();
    
    const { title } = useParams();

    const discRef = firestore.collection('discussions');

    const query = discRef.where('title', '==', title)

    const [discussions] = useCollectionData(query)
    
    var discs = []
    discRef.get().then(doc  => {
        let currentID = doc.id
        discs.push(currentID)
        discs.push('id')
    })


    return (
        <>
            <button onClick={() => navigate('/')}>Home</button>
            {discussions && discussions.map(disc => 
                    <div key='{disc}'>
                        <h3>{disc.title}</h3> 
                        <p>{disc.description}</p>
                        <p>{disc.id}</p>
                    </div>
                    )}
            {discs && discs.map(id =>
                <p key='{id}'>{id}</p>
                )}
            <div></div>
        </>
    )
}
