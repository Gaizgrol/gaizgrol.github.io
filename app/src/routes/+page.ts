import type { Role } from "$lib/types";

import ejcmPng from '$lib/assets/ejcm.png'
import estacioPng from '$lib/assets/estacio.png'
import legautPng from '$lib/assets/legaut.png'
import resiliaPng from '$lib/assets/resilia.png'
import ufrjPng from '$lib/assets/ufrj.png'

import {
    agileSvg, angularSvg,
    bulbSvg,
    cSvg, classroomSvg, comunicacaoSvg, conflitosSvg, cppSvg, css3Svg,
    djangoSvg, dockerSvg,
    equipeSvg, expressSvg,
    gitSvg, githubSvg,
    html5Svg,
    ionicSvg,
    javaSvg, jestSvg, jsSvg,
    laravelSvg, liderancaSvg,
    mongodbSvg, mysqlSvg,
    nodejsSvg,
    oratoriaSvg,
    phpSvg, pythonSvg,
    railsSvg, reactSvg, rubySvg,
    scrapingSvg, serverSvg, sheetsSvg, slidesSvg,
    testsSvg, tsSvg
} from '$lib/assets/svg'

const { ejcm, estacio, legaut, resilia, ufrj } = {
    estacio: {
        name: 'Universidade Estácio de Sá',
        logo: {
            image: estacioPng,
            backgroundColor: '#144bc9'
        }
    },
    resilia: {
        name: 'Resilia',
        logo: {
            image: resiliaPng,
            backgroundColor: '#2d2c2c'
        }
    },
    legaut: {
        name: 'LegAut',
        logo: {
            image: legautPng,
            backgroundColor: '#ffffff'
        }
    },
    ejcm: {
        name: 'EJCM',
        logo: {
            image: ejcmPng,
            backgroundColor: '#203469'
        }
    },
    ufrj: {
        name: 'UFRJ',
        logo: {
            image: ufrjPng,
            backgroundColor: '#ffffff'
        }
    }
}

export const load = (): { roles: Role[] } => ({
    roles: [
        {
            name: 'Desenvolvedor full stack',
            skillGroups: {
                SOFT: [
                    
                ],
                TOOL: [

                ],
                LANGUAGE: [

                ]
            },
            institution: resilia
        },
        {
            name: 'Estudante',
            skillGroups: {
                SOFT: [
                    
                ],
                TOOL: [

                ],
                LANGUAGE: [

                ]
            },
            institution: estacio
        },
        {
            name: 'Facilitador de tecnologia',
            skillGroups: {
                SOFT: [
                    {
                        name: 'Trabalho em equipe',
                        backgroundColor: '#ffffff',
                        image: equipeSvg
                    },
                    {
                        name: 'Comunicação interpessoal',
                        backgroundColor: '#ffffff',
                        image: comunicacaoSvg
                    },
                    {
                        name: 'Oratória',
                        backgroundColor: '#ffffff',
                        image: oratoriaSvg
                    },
                    {
                        name: 'Instrução em sala de aula',
                        backgroundColor: '#ffffff',
                        image: classroomSvg
                    },
                    {
                        name: 'Desenvolvimento e produção de conteúdo criativo',
                        backgroundColor: '#ffffff',
                        image: bulbSvg
                    },
                    {
                        name: 'Resolução de conflitos',
                        backgroundColor: '#ffffff',
                        image: conflitosSvg
                    }
                ],
                TOOL: [
                    {
                        name: 'Planilhas Google',
                        backgroundColor: '#ffffff',
                        image: sheetsSvg
                    },
                    {
                        name: 'GitHub',
                        backgroundColor: '#ffffff',
                        image: githubSvg
                    },
                    {
                        name: 'MongoDB',
                        backgroundColor: '#ffffff',
                        image: mongodbSvg
                    }
                ],
                LANGUAGE: [

                ]
            },
            institution: resilia
        },
        {
            institution: legaut,
            name: 'Desenvolvedor de back end',
            skillGroups: {
                SOFT: [
                    {
                        name: 'Trabalho em equipe',
                        backgroundColor: '#ffffff',
                        image: equipeSvg
                    },
                    {
                        name: 'Comunicação interpessoal',
                        backgroundColor: '#ffffff',
                        image: comunicacaoSvg
                    }
                ],
                TOOL: [
                    {
                        name: 'Web Scraping',
                        backgroundColor: '#ffffff',
                        image: scrapingSvg
                    },
                    {
                        name: 'Django',
                        backgroundColor: '#ffffff',
                        image: djangoSvg
                    },
                    {
                        name: 'Docker',
                        backgroundColor: '#ffffff',
                        image: dockerSvg
                    }
                ],
                LANGUAGE: [
                    {
                        name: 'Python',
                        backgroundColor: '#ffffff',
                        image: pythonSvg
                    }
                ]
            }
        },
        {
            institution: ejcm,
            name: 'Gerente de projetos',
            skillGroups: {
                SOFT: [
                    {
                        name: 'Trabalho em equipe',
                        backgroundColor: '#ffffff',
                        image: equipeSvg
                    },
                    {
                        name: 'Comunicação interpessoal',
                        backgroundColor: '#ffffff',
                        image: comunicacaoSvg
                    },
                    {
                        name: 'Oratória',
                        backgroundColor: '#ffffff',
                        image: oratoriaSvg
                    },
                    {
                        name: 'Instrução em sala de aula',
                        backgroundColor: '#ffffff',
                        image: classroomSvg
                    },
                    {
                        name: 'Desenvolvimento e produção de conteúdo criativo',
                        backgroundColor: '#ffffff',
                        image: bulbSvg
                    },
                    {
                        name: 'Liderança de equipe',
                        backgroundColor: '#ffffff',
                        image: liderancaSvg
                    },
                    {
                        name: 'Resolução de conflitos',
                        backgroundColor: '#ffffff',
                        image: conflitosSvg
                    }
                ],
                TOOL: [
                    {
                        name: 'Administração de servidor linux',
                        backgroundColor: '#ffffff',
                        image: serverSvg
                    },
                    {
                        name: 'Gestão ágil de projetos',
                        backgroundColor: '#ffffff',
                        image: agileSvg
                    },
                ]
            }
        },
        {
            institution: ejcm,
            name: 'Desenvolvedor full stack',
            skillGroups: {
                SOFT: [
                    {
                        name: 'Trabalho em equipe',
                        backgroundColor: '#ffffff',
                        image: equipeSvg
                    },
                    {
                        name: 'Comunicação interpessoal',
                        backgroundColor: '#ffffff',
                        image: comunicacaoSvg
                    }
                ],
                TOOL: [
                    {
                        name: 'Git',
                        backgroundColor: '#ffffff',
                        image: gitSvg
                    },
                    {
                        name: 'Metodologias Agile',
                        backgroundColor: '#ffffff',
                        image: agileSvg
                    },
                    {
                        name: 'Laravel',
                        backgroundColor: '#ffffff',
                        image: laravelSvg
                    },
                    {
                        name: 'Node.js',
                        backgroundColor: '#ffffff',
                        image: nodejsSvg
                    },
                    {
                        name: 'Express.js',
                        backgroundColor: '#ffffff',
                        image: expressSvg
                    },
                    {
                        name: 'Ionic Framework',
                        backgroundColor: '#ffffff',
                        image: ionicSvg
                    },
                    {
                        name: 'AngularJS',
                        backgroundColor: '#ffffff',
                        image: angularSvg
                    },
                    {
                        name: 'React Native',
                        backgroundColor: '#ffffff',
                        image: reactSvg
                    }
                ],
                LANGUAGE: [
                    {
                        name: 'HTML5',
                        backgroundColor: '#ffffff',
                        image: html5Svg
                    },
                    {
                        name: 'CSS3',
                        backgroundColor: '#ffffff',
                        image: css3Svg
                    },
                    {
                        name: 'JavaScript',
                        backgroundColor: '#ffffff',
                        image: jsSvg
                    },
                    {
                        name: 'TypeScript',
                        backgroundColor: '#ffffff',
                        image: tsSvg
                    },
                    {
                        name: 'PHP',
                        backgroundColor: '#ffffff',
                        image: phpSvg
                    },
                    {
                        name: 'MySQL',
                        backgroundColor: '#ffffff',
                        image: mysqlSvg
                    }
                ]
            }
        },
        {
            institution: ufrj,
            name: 'Estudante',
            skillGroups: {
                SOFT: [
                    {
                        name: 'Trabalho em equipe',
                        backgroundColor: '#ffffff',
                        image: equipeSvg
                    }
                ],
                TOOL: [
                    {
                        name: 'GitHub',
                        backgroundColor: '#ffffff',
                        image: githubSvg
                    }
                ],
                LANGUAGE: [
                    {
                        name: 'C',
                        backgroundColor: '#ffffff',
                        image: cSvg
                    },
                    {
                        name: 'Python',
                        backgroundColor: '#ffffff',
                        image: pythonSvg
                    },
                    {
                        name: 'Java',
                        backgroundColor: '#ffffff',
                        image: javaSvg
                    },
                    {
                        name: 'C++',
                        backgroundColor: '#ffffff',
                        image: cppSvg
                    },
                    {
                        name: 'MySQL',
                        backgroundColor: '#ffffff',
                        image: mysqlSvg
                    }
                ]
            }
        }
    ]
})