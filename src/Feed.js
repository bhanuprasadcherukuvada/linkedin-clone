import { CalendarViewDay, Create, EventNote, Image, Subscriptions } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import './Feed.css';
import { db} from './firebase';
import InputOption from './InputOption';
import Post from './Post';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move';


function Feed() {
	const [input,setInput] = useState('');
	const [posts, setPosts] = useState([]);
	
	const user = useSelector(selectUser);

	useEffect(()=>{

		db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapShot =>{
			setPosts(snapShot.docs.map(doc=>({id : doc.id,data: doc.data()})))
		})
	
	});

	const sendPost = async (e)=> {
		e.preventDefault();
		const doc = await db.collection('posts').add({
			name: user.displayName,
			description: user.email,
			message: input,
			photoUrl: user.photoUrl || "",
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		setInput("");
		
	}
	return (
		<div className="feed">
			<div className="feed__inputContainer">
				<div className="feed__input">
					<Create />
					<form action="">
						<input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							type="text"
						/>
						<button onClick={sendPost} type="submit">
							SendInvisible
						</button>
					</form>
				</div>

				<div className="feed__inputOptions">
					<InputOption title="Photo" Icon={Image} color="#70B5F9" />
					<InputOption
						title="Video"
						Icon={Subscriptions}
						color="#E7A33RE"
					/>
					<InputOption
						title="Event"
						Icon={EventNote}
						color="#C0CBCD"
					/>
					<InputOption
						title="Write Article"
						Icon={CalendarViewDay}
						color="#7FC15E"
					/>
				</div>
			</div>

			<FlipMove>
				{posts.map(
					({
						id,
						data: { name, description, message, photoUrl },
					}) => (
						<Post
							key={id}
							name={name}
							description={description}
							message={message}
							photoUrl={photoUrl}
						/>
					)
				)}
			</FlipMove>
			{/* <Post name="bhanu" description="test" message="wow worked" photoUrl=""/> */}
		</div>
	);
}

export default Feed;
