const fs = require('fs')
const axios = require('axios')
const express = require('express')
const a = process.argv

if (a.length > 3 || a.length < 3) {
    process.exit(1)
}

function readFromFile(f) {
    let pattern = RegExp("https?:\/\/[a-z0-9]*\.[a-z0-9/?=:-]*")
    fs.readFile(f, 'utf8', async (err, data) => {
        if (err) {
            process.exit(1)
        }
        let s = data.split("\n")
        console.log(s)
        for (url of s) {
            if (pattern.test(url)) {
                let p = RegExp("https?:\/\/")
                let w = url.split(p)[1] + ".txt"
                try {
                    let res = await axios.get(url)
                    fs.writeFile(w, res, 'utf8', (err) => {
                        if (err) {
                            console.error(err)
                        }
                    })
                } catch (error) {
                    console.error(error)
                }

            }
        }

    })
}

readFromFile(a[2])