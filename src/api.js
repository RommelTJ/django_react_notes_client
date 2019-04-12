const url = 'http://127.0.0.1:8000/api/v1/notes/';

export const fetchNotes = async () => {
    return fetch(url, {}).then(response => response.json()).then(data => data);
};

export const fetchNote = (id) => {
    return fetch(`${url + id}`, {}).then(response => response.json()).then(data => data);
};

export const addNote = (note) => {
    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    }).then(response => response.json()).then(data => console.log(data));

    return note;
};

export const updateNote = (note) => {
    console.log("We're updating...");
    console.log("Update note with id: " + note.id);
};
