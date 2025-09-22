function UserProfile(props) {
  return (
    <div style={{ border: '1px solid gray', padding: '15px', margin: '15px', borderRadius: '8px' }}>
      <h2 style={{ color: 'blue', marginBottom: '8px' }}>{props.name}</h2>
      <p>Age: <span style={{ fontWeight: 'bold', color: 'darkgreen' }}>{props.age}</span></p>
      <p style={{ fontStyle: 'italic' }}>Bio: {props.bio}</p>
    </div>
  );
}

export default UserProfile;
