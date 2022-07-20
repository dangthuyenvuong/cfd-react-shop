import { Skeleton as SkeletonM } from '@mui/material'


export default function Skeleton({style, ...props}) {
    return (
        <SkeletonM style={{ ...style, transform: 'none' }} {...props} />
    )
}
