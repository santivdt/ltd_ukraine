import styles from "../styles/Home.module.css"
import { data } from "../utils/data"
import { useState } from "react"
import { nanoid } from "nanoid"
import { TextField } from "@mui/material"

import { Button } from "@mui/material"

export default function Home() {
  const [name, setName] = useState(null)
  const [waText, setwaText] = useState(null)

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const generateWaText = () => {
    setwaText(
      `Beste Kamer van Koophandel,\n\nwaarom hebben jullie nog steeds de privégegevens van ZZP'ers niet afgeschermd? Elke dag die we langer wachten, blijven journalisten, activisten, advocaten en andere ZZP’ers zich onveilig voelen omdat ze met hun privé-adres staan ingeschreven bij de KvK. \n\nDe tijd van treuzelen, nog meer experts raadplegen en afwachten is voorbij. \n\nRegel dit vandaag nog! \nMet vriendelijke groet, ${name}`
    )
  }

  const handleEmailChange = event => {
    console.log(event.target.value)
    setwaText(event.target.value)
  }

  return (
    <div className={styles.container}>
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

      {!waText && (
        <Button
          variant="contained"
          onClick={generateWaText}
          sx={{ mt: 3, width: 300 }}
          disabled={!name}
        >
          Genereer bericht
        </Button>
      )}
      {waText && (
        <>
          <TextField
            id="emailBody"
            label="Email"
            multiline
            rows={12}
            autoFocus
            defaultValue={waText}
            sx={{ width: 400, mt: 3 }}
            onChange={handleEmailChange}
          />
          <a href={`https://wa.me/31613445877?text=${waText}`}>
            <Button variant="contained" sx={{ mt: 3 }}>
              Verstuur
            </Button>
          </a>
        </>
      )}
    </div>
  )
}
