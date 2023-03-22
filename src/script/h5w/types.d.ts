type FrameParts = "info"|"action"|"display"

type normalFrame = "normal" // 普通帧，上方一行info，中间大面积display，下方一行action
type dialogFrame = "dialog" // 对话帧，隐藏display，上面大面积info，下方一行action
type actionFrame = "action" // 行动帧，上方一行info，下方分两块，左边为display，右边为action
type cgFrame ="cg" // CG帧，隐藏action，上方大面积display，下方一行info

type FrameTypes = normalFrame|dialogFrame|actionFrame|cgFrame