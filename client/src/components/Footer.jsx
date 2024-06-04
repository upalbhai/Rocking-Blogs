import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import logo_white from '../assets/logo-white.png'
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 text-black  border-teal-500 bg-custom-nav dark:border-custom-orange  dark:bg-custom-black'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              <img src={logo} className='w-auto h-3 sm:h-5 dark:hidden' /> 
<img src={logo_white} className='w-auto h-3 sm:h-5 hidden dark:inline' /> 
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title className='text-black ' title='About' />
              <Footer.LinkGroup col>
                <Footer.Link className='text-black '
                  href='https://www.espn.in'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  ESPN
                </Footer.Link>
                <Footer.Link className='text-black '
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Rocking Blogs
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow us' className='text-black text-bold ' />
              <Footer.LinkGroup col>
                <Footer.Link className='text-black '
                  href='https://github.com/upalbhai'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='#'className='text-black '>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal'className='text-black ' />
              <Footer.LinkGroup col>
                <Footer.Link href='#' className='text-black '>Privacy Policy</Footer.Link>
                <Footer.Link href='#' className='text-black '>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="border-black" />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright className='text-black '
            href='#'
            by="Rocking blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center" >
            <Footer.Icon className='text-black ' href='#' icon={BsFacebook}/>
            <Footer.Icon className='text-black ' href='#' icon={BsInstagram}/>
            <Footer.Icon className='text-black ' href='#' icon={BsTwitter}/>
            <Footer.Icon className='text-black ' href='https://github.com/upalbhai' icon={BsGithub}/>
            <Footer.Icon className='text-black ' href='#' icon={BsDribbble}/>

          </div>
        </div>
      </div>
    </Footer>
  );
}