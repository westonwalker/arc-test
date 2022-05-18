let getNotes = require('./get-notes.js')

// display all notes
exports.handler = async function http (req) {
    return {
      statusCode: 200,
      headers: {
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'content-type': 'text/html; charset=utf8'
      },
      body: await getContent
    }
}
async function getContent (req) {
  let notes = await getNotes(1)

  let greeting = `You don't have any notes! Make some below`
  if (notes.length) {
    greeting = `You have <strong>${notes.length}</strong> notes.`
  }
  console.log(notes);
  let list = notes.Items.map(note=> {
    return `
      <section class="card">
        <a href=/notes/${note.noteID}>        
          <heading>
            ${note.title}
          </heading>        
          <p>${note.body}</p>
        </a>
      </section>`
  })

  var contents = /*html*/`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Architect</title>
  <style>
     * { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; } .max-width-320 { max-width: 20rem; } .margin-left-8 { margin-left: 0.5rem; } .margin-bottom-16 { margin-bottom: 1rem; } .margin-bottom-8 { margin-bottom: 0.5rem; } .padding-32 { padding: 2rem; } .color-grey { color: #333; } .color-black-link:hover { color: black; } 
  </style>
</head>
<body class="padding-32">
  <div class="max-width-320">
    <section>
      <p>${greeting}</p>
      <section class="cards">
        ${list.join('')}
      </section>
      <form action=/notes method=post>
        <h2>Make a note</h2>
        <div class="input-and-label">
          <input name="title" required="required" type="text" autocomplete="off" value="" placeholder="Title" autofocus/>
          <label for="email">Title</label>
        </div>
        <div class="input-and-label">
          <textarea name="body" required="required" autocomplete="off" value="" placeholder="Body text"></textarea>
          <label for="body">Body</label>
        </div>
        <button>Make a note</button>
      </form>
    </section>
    </div>
  </body>
  </html>
  `

  return contents;
}