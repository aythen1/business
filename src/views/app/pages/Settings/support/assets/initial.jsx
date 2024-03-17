// import IconGetStarted from './icon-get-started.svg'
import { useTranslation } from 'react-i18next';

export const iniTopics = () => {
  const { t } = useTranslation();

  const initialTopics = [{
    icon: require('./icon-get-started.jsx').default,
    title: t('support.topics.1.title'),
    href: '/es/app/support/tickets',
    description: [{ 
        title: t('support.topics.1.data.1.title'), 
        // title: 'Están seguros mis datos?', 
        text: t('support.topics.1.data.1.text') 
    },{ 
        title: t('support.topics.1.data.2.title'),
        text: t('support.topics.1.data.2.text') 
    }]
}, 
{
    icon: require('./icon-account.jsx').default,
    title: t('support.topics.2.title'),
    href: '/es/app/support/tickets',
    description: [{ 
        title: t('support.topics.2.data.1.title'),
        text: t('support.topics.2.data.1.text')
    },{ 
        title: t('support.topics.2.data.2.title'), 
        text: t('support.topics.2.data.2.text')
    }]
}, {
    icon: require('./icon-billing.jsx').default,
    title: t('support.topics.3.title'),
    href: '/es/app/support/tickets',
    description: [{ 
        title: t('support.topics.3.data.1.title'), 
        text: t('support.topics.3.data.1.text')
    },{ 
        title: t('support.topics.3.data.2.title'), 
        text: t('support.topics.3.data.2.text')
    }]
}, {
    icon: require('./icon-instance.jsx').default,
    title: t('support.topics.4.title'),
    href: '/es/app/support/tickets',
    description: [{ 
        title: t('support.topics.4.data.1.title'), 
        text: t('support.topics.4.data.1.text')
    },{ 
        title: t('support.topics.4.data.1.title'), 
        text: t('support.topics.4.data.1.text')
    },{ 
        title: t('support.topics.4.data.2.title'), 
        text: t('support.topics.4.data.2.text')
    },{ 
        title: t('support.topics.4.data.3.title'), 
        text: t('support.topics.4.data.3.text')
    },{ 
        title: t('support.topics.4.data.4.title'), 
        text: t('support.topics.4.data.4.text')
    }]
}, {
    icon: require('./icon-elastic-metal.jsx').default,
    title: t('support.topics.5.title'),
    href: '/es/app/support/tickets',
    description: [{ 
        title: t('support.topics.5.data.1.title'),
        text: t('support.topics.5.data.1.text'),
    },{ 
        title: t('support.topics.5.data.2.title'),
        text: t('support.topics.5.data.2.text'),
    }]
}, {
    icon: require('./icon-kubernetes.jsx').default,
    title: t('support.topics.6.title'),
    href: '/es/app/support/tickets',
    description: [{ 
        title: t('support.topics.6.data.1.title'),
        text: t('support.topics.6.data.1.text')
    },{ 
        title: t('support.topics.6.data.2.title'), 
        text: t('support.topics.6.data.2.text')
    },{ 
        title: t('support.topics.6.data.3.title'), 
        text: t('support.topics.6.data.3.text')
    },{ 
        title: t('support.topics.6.data.4.title'), 
        text: t('support.topics.6.data.4.text')
    },{
        title: t('support.topics.6.data.5.title'),
        text: t('support.topics.6.data.5.text')
    },{
        title: t('support.topics.6.data.6.title'),
        text: t('support.topics.6.data.6.text')
    },{
        title: t('support.topics.6.data.7.title'),
        text: t('support.topics.6.data.7.text')
    }]
}]


return initialTopics;
}





export const initialStatus = [{
    title: 'Containers',
    value: 1
}, {
    title: 'Containers',
    value: 1
}, {
    title: 'Containers',
    value: 1
}, {
    title: 'Containers',
    value: 1
}, {
    title: 'Containers',
    value: 1
}]




export const initialQuery = [{
    title: 'Tutorials / Using-Secret-Manager-With-Github-Action /',
    subtitle: 'Fetching secrets from the Secret Manager using the Scaleway Github Action'
},{
    title: 'Tutorials / First-Steps-Linux-Command-Line /',
    subtitle: 'First steps with the Linux command line'
},{
    title: 'Serverless / Functions / Reference-Content / Use-Cases ',
    subtitle: 'Functions use cases'
},{
    title: 'Serverless / Functions / Reference-Content / Functions-Runtimes-Configuration ',
    subtitle: 'Functions runtimes configurations'
}]