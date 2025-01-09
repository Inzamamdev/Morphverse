import { useEffect } from "react"
import useMatterEngine from "../../hooks/useMatterEngine"
import { Ground } from "../../components/gameComponents/Ground"
import { Player } from "../../components/gameComponents/Player"
import Flag from "../../components/gameComponents/Flag"

interface Props {
    shape: string
}

export default function Stage1({ shape }: Props) {
    const engine = useMatterEngine({})
    useEffect(() => {

    }, [])
    return (
        <div>
            <Player engine={engine} shape={shape} />
            <Flag type="Start" engine={engine} x={320} y={150} />
            <Flag type="End" engine={engine} x={1020} y={150} />
            <Ground engine={engine} width={900} height={10} angle={0} x={750} y={180} />
        </div>
    )
}