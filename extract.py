import sys, trafilatura

def getContent(url):
    downloaded = trafilatura.fetch_url(url)
    str1 = trafilatura.extract(downloaded)
    str1 = str1.strip().replace("\n", '');
    print(str1)

if __name__ == '__main__':
    getContent(sys.argv[1])