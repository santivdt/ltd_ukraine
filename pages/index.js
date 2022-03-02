import Head from "next/head"
import styles from "../styles/Home.module.css"
import { data } from "../utils/data"
import { useState } from "react"
import { nanoid } from "nanoid"
import { TextField } from "@mui/material"

import Autocomplete from "@mui/material/Autocomplete"
import { Button } from "@mui/material"

export default function Home() {
  const gemeenten = data.map(item => ({ ...item, id: nanoid() }))
  const [value, setValue] = useState(gemeenten[0])
  const [name, setName] = useState(null)
  const [emailBody, setEmailBody] = useState(null)

  const handleChange = (event, newValue) => {
    console.log(newValue)
    if (newValue) {
      setValue(newValue)
    }
  }

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const generateEmail = () => {
    setEmailBody(
      `Beste Gemeente ${value.label}, \n \n Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est sit labore ut eos quod aut tenetur iure voluptatum non velit! \n \n Met vriendelijke groet, \n \n ${name}`
    )
  }

  const handleEmailChange = event => {
    console.log(event.target.value)
    setEmailBody(event.target.value)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>DeGoedeZaak - Neem vluchtelingen op</title>
        <meta name="description" content="DeGoedeZaak" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <p>Kies je gemeente, vul je naam in en druk op de email knop.</p>
        <Autocomplete
          disablePortal
          value={value.label}
          onChange={handleChange}
          id="search"
          className={styles.input}
          options={gemeenten}
          placeholder="Begin met typen.."
          sx={{ width: 300 }}
          renderInput={params => <TextField {...params} label="Gemeente" />}
        />
        <div className={styles.namecontainer}>
          <TextField
            id="first"
            required
            label="Naam"
            name="first"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            sx={{ width: 300 }}
          />
        </div>

        {!emailBody && (
          <Button
            variant="contained"
            onClick={generateEmail}
            sx={{ mt: 3 }}
            disabled={!name}
          >
            Genereer mail
          </Button>
        )}
        {emailBody && (
          <>
            <TextField
              id="emailBody"
              label="Email"
              multiline
              rows={12}
              autoFocus
              defaultValue={emailBody}
              sx={{ width: 500, mt: 3 }}
              onChange={handleEmailChange}
            />
            <a
              href={
                "mailto:" +
                value.email +
                "?subject=Test onderwerp&body=" +
                encodeURIComponent(emailBody)
              }
              target="_new"
            >
              <Button variant="contained" sx={{ mt: 3 }}>
                Verstuur
              </Button>
            </a>
          </>
        )}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
