import { useState } from 'react';
import NoteContext from "./noteContext";

const NoteState = (props)=>{
  const host = "http://localhost:5000";
	const notesInitial=[]

    const [notes,setNotes]=useState(notesInitial);

    // Get All Notes
    const fetchNote= async ()=>
    {
       const token = localStorage.getItem('token');
      try 
      {
        const response = await fetch(`${host}/api/notes/fetchAllNotes`,{
              method: 'GET',
              headers: {
                'Content-Type':'application/json',
                'auth-token':token,
              },
           });

            if (!response.ok) 
             {
               throw new Error('Failed to fetch notes');
             }

            const json=await response.json();
           setNotes(json);
      } 
      catch (error) 
      {
          console.error("Error fetching notes:", error);
      }
  }

    // Add a Note
     const addNote= async (title,description,tag)=>{
      const token = localStorage.getItem('token');
       try 
       {   
            const response = await fetch(`${host}/api/notes/addNotes`,{
                  method: 'POST',
                  headers: {
                    'Content-Type':'application/json',
                    'auth-token':token,
                  },
                  body: JSON.stringify({title,description,tag})
               });

             if (!response.ok) 
             {
               throw new Error('Failed to add notes');
             }


            const note=await response.json();
            setNotes(notes.concat(note));
        } 
        catch (error) 
        {
          console.error("Error adding notes:", error);
        }
     }


    // Delete a Note
    const deleteNote= async (id)=>{
       const token = localStorage.getItem('token');
      try 
       {
          const response = await fetch(`${host}/api/notes/deleteNotes/${id}`,{
                method: 'DELETE',
                headers: {
                  'Content-Type':'application/json',
                  'auth-token':token,
                },
             });

          if (!response.ok) 
          {
            throw new Error('Failed to delete notes');
          }
      const newNotes = notes.filter((note)=>{return note._id !==id});
      setNotes(newNotes);
      } 
        catch (error) 
        {
          console.error("Error deleting notes:", error);
        }
  }


    //update a Note
    const editNote= async (id,title,description,tag)=>{
       const token = localStorage.getItem('token');
        try 
       {   
         const response = await fetch(`${host}/api/notes/updateNotes/${id}`,{
            method: 'PUT',
            headers: {
              'Content-Type':'application/json',
              'auth-token':token,
            },
            body: JSON.stringify({title,description,tag})
         });

         if (!response.ok) 
        {
            throw new Error('Failed to update notes');
        }

          let newNotes = JSON.parse(JSON.stringify(notes)); //create a deep copy. it ensures that you don't mutate the state directly, 
          for(let index=0; index < notes.length ; index++)
          {
            const element = newNotes[index];
            if(element._id === id)
            {
              newNotes[index].title = title;
              newNotes[index].description = description;
              newNotes[index].tag = tag;
              break;
            }
          }
        setNotes(newNotes);
        } 
        catch (error) 
        {
          console.error("Error updating notes:", error);
        }
     }

    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,fetchNote}}>
        	{props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;