import { createBunny, getFamilies, checkAuth, logout } from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async (e) => {
    // prevent default
    e.preventDefault();

    // get the name and family id from the form
    const data = new FormData(form);

    const bunnyName = data.get('bunny-name');
    const familyID = data.get('family-id');
    // use createBunny to create a bunny with this name and family id
    await createBunny({
        name: bunnyName,
        family_id: familyID,
    });

    form.reset();
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const selectEl = document.querySelector('select');
    // go get the families from supabase
    const families = await getFamilies();
    // for each family
    for (let family of families) {
        // create an option tag
        const familyOption = document.createElement('option');
        // set the option's value and text content
        familyOption.textContent = family.name;
        familyOption.value = family.id;
        // and append the option to the select
        selectEl.append(familyOption);
    }
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
