export type Institution = {
    name: string
    logo: HasImage
}

export type Role = {
    name: string
    skillGroups: Partial<Record<SkillGroup, Skill[]>>
    institution: Institution
}

export type SkillGroup = 'SOFT' | 'TOOL' | 'LANGUAGE'

export type Skill = { name: string } & HasImage

export type HasImage = {
    image: string
    backgroundColor: string
}
