'use strict'
process.env.FORCE_COLOR = '1'
//
//to compile:
//npx babel source.js -o index.js; node ./index.js

import React from 'react'
import { Text, Box, render, useApp } from 'ink'
import { useState, useEffect } from 'react'
import si from 'systeminformation'
import sn from 'serial-number'
import crypto from 'crypto'
import got from 'got'
import fs from 'fs'
// import importJsx from "import-jsx";

import Gradient from 'ink-gradient'
import BigText from 'ink-big-text'
import Spinner from 'ink-spinner'
import Divider from 'ink-divider'

// import Server from "./src/components/Server.js";
// import Logo from "./src/components/Logo.js";
// const Timer = importJsx("./src/components/Timer.js");
// const Devices = importJsx("./src/components/Devices.js");
// const Encrypting = importJsx("./src/components/Encrypting.js");
// const Fetching = importJsx("./src/components/Fetching.js");
// const Result = importJsx("./src/components/Result.js");

const key = 'AlexeiShulzhickij2020'
//number of devices
const devices = 3
//drive letter
const USBletter = 'E:'

const Server = (setServer) => {
    const app = require('express')()
    const port = 3000
    const bodyParser = require('body-parser')
    let path = __dirname + '/database.json'

    //
    //database:
    //
    //{
    //	user: [data, data, data, ...]
    //}
    //
    //{
    //	sdc1s2fsdf341sd: [13123123, 13122323, 12233223, ...]
    //}
    //

    const readDatabase = () => {
        if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}))

        return JSON.parse(fs.readFileSync(path))
    }

    const writeDatabase = (data) => {
        if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}))

        return fs.writeFileSync(path, JSON.stringify(data))
    }

    app.use(bodyParser.json())

    app.post('/', (req, res) => {
        const data = req.body
        const token = data
            .map((value) => {
                const resizedIV = Buffer.allocUnsafe(16)

                const nkey = crypto.createHash('sha256').update(key).digest(),
                    decipher = crypto.createDecipheriv(
                        'aes256',
                        nkey,
                        resizedIV
                    )
                let msg = []

                msg.push(decipher.update(value, 'hex', 'binary'))
                msg.push(decipher.final('binary'))

                return msg.join('').substr(-10)
            })
            .join('')

        let database = readDatabase()

        if (!(token in database)) {
            let user = Object.keys(database).find((user) =>
                token.match(/.{1,10}/g).some((tkn) => user.includes(tkn))
            )

            if (
                user &&
                token.match(/.{1,10}/g).filter((str) => user.includes(str))
                    .length +
                    1 >
                    devices
            )
                database[token] = database[user]
            else database[token] = []
        }

        database[token].push(Date.now())

        writeDatabase(database)

        res.json([token, database[token]])
    })

    app.use((err, req, res, next) => {
        console.log(err)
        setServer(false)
        res.status(204).send()
    })

    app.listen(port, () => {
        setServer(true)
    })
}

const Logo = ({ text, status }) => {
    const [dead, setDead] = useState(false)

    useEffect(() => {
        setDead(false)
        if (status === 'devices') return () => {}
        let timer = setTimeout(() => setDead(true), 10000)
        return () => clearTimeout(timer)
    }, [status])

    const skull = `

 ▄▀▀▀▀▀▄   
▐ ▄▄ ▄▄ ▌
▐ ▀ ▄ ▀ ▌
 ▌▄ ▄ ▄▐
 ▐ ▀ ▀ ▌
  ▀▀▀▀▀    
`

    const logo = (
        <Text>
            <Gradient name='rainbow'>
                <BigText text={text} />
            </Gradient>
        </Text>
    )

    const deadLogo = (
        <Box flexDirection='column'>
            <Box>
                <Text color='red'>{skull}</Text>
                <Text color='red'>
                    <BigText text='404' />
                </Text>
            </Box>
            <Text>
                Application is <Text color='redBright'>dead</Text>
            </Text>
            <Box height={1} />
        </Box>
    )

    return dead ? deadLogo : logo
}

const Timer = ({ trb }) => {
    const [time, setTime] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => setTime((time) => time + 1), 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <Divider
            padding={6}
            titlePadding={5}
            title={time + ' c.'}
            dividerColor={!trb ? 'red' : undefined}
            dividerChar={!trb ? '!' : undefined}
            width={30}
        />
    )
}

const Device = ({
    device,
    completed = false,
    result = undefined,
    error = false,
    simple = false,
    textColor = undefined
}) => {
    let color = !simple ? 'yellow' : undefined
    let deviceColor = undefined
    let prefix = !simple ? <Spinner type='line' /> : ''
    let value = '[Pending]'

    if (!simple) {
        if (completed) {
            color = 'red'
            prefix = '✘'
            deviceColor = 'gray'
            value = 'Not available'
        }
        if (!result && error) {
            deviceColor = 'gray'
            textColor = 'blue'
            prefix = <Spinner type='dots' />
            value = 'Not available'
        }
        if (result) {
            color = 'green'
            prefix = '✔'
            deviceColor = undefined
            value = result
        }
    } else value = result

    return (
        <Box>
            <Box width='14'>
                <Text>
                    <Text color={color}>{prefix}</Text>{' '}
                    <Text color={deviceColor}>{device}</Text>
                </Text>
            </Box>
            <Text>
                <Text color={textColor || color}>{value}</Text>
            </Text>
        </Box>
    )
}

const Devices = ({ done }) => {
    const [keys, setKeys] = useState({})
    const [status, setStatus] = useState(undefined)
    const [count, setCount] = useState(0)

    const devices = ['flash drive', 'CPU', 'HDD', 'mac-address', 'ip-address']

    useEffect(() => {
        if (devices.every((device) => keys[device])) {
            setStatus(['Completed', 'green'])
            setTimeout(() => done(keys), 1000)
        }
    }, [count, keys])

    useEffect(() => {
        let timers = []
        const errorHandler = (device) => {
            setStatus(['Cannot get ' + device, 'red'])
            timers.push(
                setTimeout(() => {
                    setKeys((keys) => {
                        delete keys[device]
                        return keys
                    })
                    setCount((count) => count + 1)
                }, 5000)
            )
        }

        if (!keys['flash drive']) {
            si.blockDevices().then((data) => {
                const serial = data.find((obj) => obj.name === USBletter)
                    ?.serial
                if (!serial) errorHandler('flash drive')
                setKeys((keys) => ({
                    ...keys,
                    ...{ 'flash drive': serial }
                }))
            })
        }

        if (!keys['CPU'])
            sn((err, value) => {
                if (err) errorHandler('CPU')
                setKeys((keys) => ({ ...keys, ...{ CPU: value } }))
            })

        if (!keys['HDD'])
            si.diskLayout().then((data) => {
                if (!data) errorHandler('HDD')
                setKeys((keys) => ({
                    ...keys,
                    ...{ HDD: data.pop().serialNum }
                }))
            })

        if (!keys['mac-address'])
            si.networkInterfaces().then((data) => {
                if (!data) errorHandler('mac-address')
                setKeys((keys) => ({
                    ...keys,
                    ...{ 'mac-address': data.shift().mac }
                }))
            })

        if (!keys['ip-address'])
            si.networkInterfaces().then((data) => {
                if (!data) errorHandler('ip-address')
                setKeys((keys) => ({
                    ...keys,
                    ...{ 'ip-address': data.shift().ip4 }
                }))
            })
        return () => timers.forEach((timer) => clearTimeout(timer))
    }, [count])

    return (
        <Box flexDirection='column'>
            {devices.map((device, i) => (
                <Device
                    key={i}
                    device={device}
                    completed={device in keys}
                    result={keys[device]}
                    error={status}
                />
            ))}
            {status && <Text color={status[1]}>{status[0]}</Text>}
        </Box>
    )
}

const Encrypting = ({ done, data: keys }) => {
    const [current, setStatus] = useState(null)
    const [stack, setStack] = useState(['hashing', 'encrypting', 'completed'])
    const [data, setData] = useState(null)

    const nextState = () => {
        setStatus(stack.shift())
        setStack(stack)
    }

    useEffect(() => {
        if (!current) {
            setData(keys)
            nextState()
        }
    })

    useEffect(() => {
        if (!data) return () => {}

        if (current === 'hashing')
            setTimeout(() => {
                setData(
                    Object.fromEntries(
                        Object.entries(data).map(([key, value]) => [
                            key,
                            crypto
                                .createHash('sha256')
                                .update(value)
                                .digest('hex')
                        ])
                    )
                )
                nextState()
            }, 500)
        if (current === 'encrypting')
            setTimeout(() => {
                setData(
                    Object.fromEntries(
                        Object.entries(data).map(([item, value]) => {
                            const resizedIV = Buffer.allocUnsafe(16)

                            const nkey = crypto
                                    .createHash('sha256')
                                    .update(key)
                                    .digest(),
                                cipher = crypto.createCipheriv(
                                    'aes256',
                                    nkey,
                                    resizedIV
                                )
                            let msg = []

                            msg.push(cipher.update(value, 'binary', 'hex'))
                            msg.push(cipher.final('hex'))

                            return [item, msg.join('')]
                        })
                    )
                )
                nextState()
            }, 500)
        if (current === 'completed')
            setTimeout(() => done(Object.values(data)), 1000)
    }, [current])

    let label = null
    let color = null

    if (current === 'hashing') {
        label = 'source'
        color = undefined
    }
    if (current === 'encrypting') {
        label = 'sha256'
        color = 'red'
    }
    if (current === 'completed') {
        label = 'aes256'
        color = 'yellow'
    }

    if (!data) return null

    return (
        <Box flexDirection='column'>
            <Box>
                <Text color='yellow'>
                    <Spinner type='line' />
                </Text>
                <Text color={color}> {label}</Text>
            </Box>
            {Object.entries(data).map(([key, value]) => (
                <Device
                    key={key}
                    device={key}
                    result={value}
                    simple
                    textColor={color}
                />
            ))}
        </Box>
    )
}

const Fetching = ({ done, data: keys }) => {
    const [color, setColor] = useState('blue')

    useEffect(() => {
        setColor('yellow')
        setTimeout(
            () =>
                got
                    .post('http://localhost:3000/', {
                        json: keys,
                        responseType: 'json'
                    })
                    .then(({ body }) => {
                        setColor('green')
                        setTimeout(() => done(body), 2000)
                    }),
            2000
        )
    }, [])

    return (
        <Box>
            <Text color={color}>
                <Spinner type='dots3' />
            </Text>
            <Text> Fetching data</Text>
        </Box>
    )
}

const Result = ({ data }) => {
    const [token, items] = data

    return (
        <Box flexDirection='column'>
            <Text>
                user <Text color='red'>data</Text>
            </Text>
            <Text>
                name: <Text color='yellow'>{token}</Text>
            </Text>
            <Text>data:</Text>
            {items.map((stmp, i) => (
                <Box key={stmp}>
                    <Box width={3}>
                        <Text>{i}</Text>
                    </Box>
                    <Text>-{'>'} </Text>
                    <Text color='blue'>{new Date(stmp).toISOString()}</Text>
                </Box>
            ))}
        </Box>
    )
}

const App = () => {
    const [server, setServer] = useState(false)
    const [current, setStatus] = useState(null)
    const [stack, setStack] = useState([
        'devices',
        'encrypting',
        'fetching',
        'completed'
    ])
    const [data, setData] = useState(null)
    const { exit } = useApp()

    const nextState = (value) => {
        if (value) setData(value)
        setStatus(stack.shift())
        setStack(stack)
    }

    useEffect(() => {
        if (!current) nextState()
        if (current === 'completed') {
            exit()
        }
    })

    useEffect(() => {
        Server(setServer)
    }, [])

    return (
        <Box flexDirection='column'>
            <Logo text='Lab 1' status={current} />
            <Timer trb={server} />
            {current == 'devices' && <Devices done={nextState} />}
            {current == 'encrypting' && (
                <Encrypting done={nextState} data={data} />
            )}
            {current == 'fetching' && <Fetching done={nextState} data={data} />}
            {current == 'completed' && <Result data={data} />}
        </Box>
    )
}

render(<App />)
