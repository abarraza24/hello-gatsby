<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>

<h1 align="center">
  Alex's Gatsby MongoDB Lab
</h1>

<p align="center">
  A Gatsby practice project using React, GraphQL, MDX, Tailwind CSS, DaisyUI,
  MongoDB, Vagrant, and VirtualBox.
</p>

## About the project

This project started from the Gatsby Minimal Starter and was expanded to practice:

- Gatsby page development
- React components and state
- Gatsby GraphQL queries
- MDX blog posts
- Tailwind CSS 4
- DaisyUI 5
- MongoDB product data
- Vagrant and VirtualBox
- Linux shell provisioning
- Empty-database handling
- Responsive page design
- Automatic carousel behavior

The Products page retrieves product records from MongoDB running inside an AlmaLinux 9 Vagrant virtual machine.

## Project features

- Responsive navigation bar
- Home, About, Blog, Products, and 404 pages
- MDX blog posts
- MongoDB product catalog
- Gatsby GraphQL product queries
- Automatic featured-product carousel
- Carousel pause on hover and keyboard focus
- Responsive DaisyUI product cards
- Empty MongoDB collection message
- Explicit Gatsby GraphQL schema for empty collections
- Tailwind CSS and DaisyUI styling

## Technologies used

- Gatsby 5
- React 18
- GraphQL
- MDX
- Tailwind CSS 4
- DaisyUI 5
- MongoDB 8
- Node.js
- Vagrant
- VirtualBox
- AlmaLinux 9
- Bash

## Prerequisites

Install the following software before running the complete project:

- Node.js
- npm
- Vagrant
- VirtualBox

Verify the installations:

```shell
node --version
npm --version
vagrant --version
VBoxManage --version
```

## Vagrant MongoDB environment

The MongoDB virtual machine can be kept outside the Gatsby project. A recommended Windows folder layout is:

```text
C:\tools\vagrant\redhat-mongo\
├── Vagrantfile
└── provision-mongo.sh
```

Keeping the virtual-machine files in a separate tools folder prevents Vagrant-specific files from becoming mixed into the Gatsby source code.

Create the folders from PowerShell:

```powershell
mkdir C:\tools\vagrant\redhat-mongo
cd C:\tools\vagrant\redhat-mongo
```

Create a file named `Vagrantfile` in that folder and paste in:

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "almalinux/9"
  config.vm.hostname = "rhel-mongo"

  # Forward MongoDB from the VM to this computer.
  # Gatsby connects through mongodb://localhost:27017.
  config.vm.network "forwarded_port",
    guest: 27017,
    host: 27017,
    host_ip: "127.0.0.1",
    auto_correct: false

  config.vm.provider "virtualbox" do |vb|
    vb.name = "rhel-mongo"
    vb.memory = 2048
    vb.cpus = 2
  end

  # SSH compatibility settings for the AlmaLinux Vagrant box.
  config.ssh.extra_args = [
    "-o",
    "PubkeyAcceptedKeyTypes=+ssh-rsa",
    "-o",
    "HostKeyAlgorithms=+ssh-rsa"
  ]

  config.ssh.keys_only = false

  # Install and configure MongoDB.
  config.vm.provision "shell", path: "provision-mongo.sh"
end
```

Create a second file named `provision-mongo.sh` in the same folder and paste in:

```bash
#!/usr/bin/env bash

set -euo pipefail

echo "Updating system packages..."
sudo dnf update -y

echo "Installing useful tools..."
sudo dnf install -y \
  vim \
  nano \
  wget \
  curl \
  net-tools

echo "Creating the MongoDB 8.0 repository file..."

sudo tee /etc/yum.repos.d/mongodb-org-8.0.repo > /dev/null <<'EOF'
[mongodb-org-8.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/9/mongodb-org/8.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://pgp.mongodb.com/server-8.0.asc
EOF

echo "Refreshing repository metadata..."
sudo dnf clean all
sudo dnf makecache

echo "Installing MongoDB..."
sudo dnf install -y mongodb-org

echo "Configuring MongoDB to accept Vagrant forwarded connections..."

sudo sed -i \
  's/^[[:space:]]*bindIp:[[:space:]]*.*/  bindIp: 0.0.0.0/' \
  /etc/mongod.conf

echo "Allowing MongoDB through the VM firewall..."

if sudo systemctl is-active --quiet firewalld; then
  sudo firewall-cmd --permanent --add-port=27017/tcp
  sudo firewall-cmd --reload
else
  echo "firewalld is not running. No firewall rule was required."
fi

echo "Enabling and starting MongoDB..."
sudo systemctl enable --now mongod

echo "Checking MongoDB status..."
sudo systemctl status mongod --no-pager || true

echo "MongoDB version:"
mongod --version

echo "Mongo shell version:"
mongosh --version || true

echo "Testing the MongoDB connection..."

mongosh \
  --host 127.0.0.1 \
  --port 27017 \
  --quiet \
  --eval 'db.runCommand({ ping: 1 })'

echo "MongoDB setup complete."
echo "Gatsby connection string: mongodb://localhost:27017"
```

### Start the MongoDB virtual machine

Open PowerShell or Git Bash and move into the Vagrant folder:

```powershell
cd C:\tools\vagrant\redhat-mongo
```

Start and provision the VM:

```shell
vagrant up
```

The first startup may take several minutes because Vagrant must download the AlmaLinux box, create the virtual machine, install updates, install MongoDB, and configure the service.

Connect to the virtual machine:

```shell
vagrant ssh
```

Check MongoDB inside the VM:

```shell
sudo systemctl status mongod
```

Test MongoDB:

```shell
mongosh --eval "db.runCommand({ ping: 1 })"
```

Exit the VM:

```shell
exit
```

### Common Vagrant commands

Run these commands from:

```text
C:\tools\vagrant\redhat-mongo
```

Start the VM:

```shell
vagrant up
```

Connect through SSH:

```shell
vagrant ssh
```

Run the provisioning script again:

```shell
vagrant provision
```

Restart the VM:

```shell
vagrant reload
```

Stop the VM:

```shell
vagrant halt
```

Remove the VM:

```shell
vagrant destroy -f
```

Completely rebuild and reprovision it:

```shell
vagrant destroy -f
vagrant up
```

## MongoDB connection

Gatsby connects to MongoDB through:

```text
mongodb://localhost:27017
```

The MongoDB database used by this project is:

```text
my_gatsby_db
```

The collection used by the Products page is:

```text
products
```

The related Gatsby configuration is located in `gatsby-config.js`.

```js
{
  resolve: "gatsby-source-mongodb",
  options: {
    connectionString:
      process.env.MONGODB_URI || "mongodb://localhost:27017",
    dbName: "my_gatsby_db",
    collection: ["products"],
  },
}
```

## Python database scripts

The Python helper scripts can also be kept outside the Gatsby project.

A recommended Windows folder layout is:

```text
C:\tools\python\
├── seed_more_products.py
└── clear_db.py
```

Create the folder from PowerShell:

```powershell
mkdir C:\tools\python
cd C:\tools\python
```

Install the required Python packages:

```powershell
python -m pip install pymongo faker
```

### Seed the database with sample products

Create:

```text
C:\tools\python\seed_more_products.py
```

Paste in:

```python
import sys
import random
from pymongo import MongoClient
from faker import Faker

fake = Faker()

MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "my_gatsby_db"
COLLECTION_NAME = "products"

ADJECTIVES = [
    "Mechanical",
    "Wireless",
    "Ergonomic",
    "UltraWide",
    "Noise-Cancelling",
    "Smart",
    "Portable",
    "RGB",
    "Developer Edition",
]

NOUNS = [
    "Keyboard",
    "Mouse",
    "Monitor",
    "Headphones",
    "Desk Lamp",
    "Webcam",
    "USB Hub",
    "Cable Organizer",
    "Microphone",
    "Laptop Stand",
]


def generate_fake_product():
    product_name = f"{random.choice(ADJECTIVES)} {random.choice(NOUNS)}"

    return {
        "name": product_name,
        "price": round(random.uniform(10.00, 500.00), 2),
        "description": (
            f"{fake.catch_phrase()}. "
            f"Built specifically for {fake.job().lower()}s."
        ),
    }


def main():
    print("Connecting to Vagrant MongoDB...")

    try:
        client = MongoClient(
            MONGO_URI,
            serverSelectionTimeoutMS=5000,
        )
        client.server_info()
    except Exception as error:
        print(
            "Error: Could not connect to MongoDB. "
            "Is your Vagrant box running?\n"
            f"Detail: {error}"
        )
        sys.exit(1)

    print(f"Dropping database: {DB_NAME}...")
    client.drop_database(DB_NAME)

    database = client[DB_NAME]
    collection = database[COLLECTION_NAME]

    number_of_products = 25

    print(
        f"Generating {number_of_products} dynamic products "
        "using Faker..."
    )

    new_products = [
        generate_fake_product()
        for _ in range(number_of_products)
    ]

    print(
        f"Inserting fresh products into "
        f"'{DB_NAME}.{COLLECTION_NAME}'..."
    )

    result = collection.insert_many(new_products)

    print(
        "Database reset and seeded successfully! "
        f"🌱 Inserted {len(result.inserted_ids)} items."
    )

    client.close()


if __name__ == "__main__":
    main()
```

Run the script:

```powershell
cd C:\tools\python
python seed_more_products.py
```

This script:

- Connects to MongoDB through `mongodb://localhost:27017`
- Drops the existing `my_gatsby_db` database
- Recreates the `products` collection
- Generates 25 sample products with Faker
- Inserts the products into MongoDB

> Running this script deletes the existing `my_gatsby_db` database before inserting new sample products.

### Clear the database

Create:

```text
C:\tools\python\clear_db.py
```

Paste in:

```python
import sys
from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "my_gatsby_db"


def main():
    print("Connecting to Vagrant MongoDB...")

    try:
        client = MongoClient(
            MONGO_URI,
            serverSelectionTimeoutMS=5000,
        )
        client.server_info()
    except Exception as error:
        print(
            "Error: Could not connect to MongoDB.\n"
            f"Detail: {error}"
        )
        sys.exit(1)

    print(f"Dropping database: {DB_NAME}...")
    client.drop_database(DB_NAME)

    print("Database cleared! It is now completely empty. 🧼")

    client.close()


if __name__ == "__main__":
    main()
```

Run the script:

```powershell
cd C:\tools\python
python clear_db.py
```

This removes the entire `my_gatsby_db` database and leaves MongoDB empty.

After clearing or reseeding the database, refresh Gatsby's data layer:

```powershell
curl.exe -X POST http://localhost:8000/__refresh
```

This requires Gatsby to have been started with `ENABLE_GATSBY_REFRESH_ENDPOINT=true`.

### Recommended startup workflow

Start MongoDB first:

```powershell
cd C:\tools\vagrant\redhat-mongo
vagrant up
```

Seed the database:

```powershell
cd C:\tools\python
python seed_more_products.py
```

Start Gatsby from the Gatsby project folder:

```powershell
npm run develop
```

To test the empty-database page:

```powershell
cd C:\tools\python
python clear_db.py
```

Then refresh Gatsby:

```powershell
curl.exe -X POST http://localhost:8000/__refresh
```


## Refresh Gatsby data without restarting

During development, Gatsby can expose a refresh endpoint so MongoDB data can be reloaded without stopping and restarting the Gatsby development server.

### Start Gatsby with the refresh endpoint enabled

In PowerShell, run this from the Gatsby project folder:

```powershell
$env:ENABLE_GATSBY_REFRESH_ENDPOINT="true"
npm run develop
```

You can also run both commands on one line:

```powershell
$env:ENABLE_GATSBY_REFRESH_ENDPOINT="true"; npm run develop
```

Keep that terminal running.

### Refresh Gatsby after changing MongoDB data

After running either Python database script, open a second PowerShell terminal and send a POST request to Gatsby:

```powershell
curl.exe -X POST http://localhost:8000/__refresh
```

On some Windows systems, `curl` is an alias for `Invoke-WebRequest`. Using `curl.exe` ensures that the actual curl program is used.

PowerShell can also call the endpoint directly:

```powershell
Invoke-WebRequest `
  -Method POST `
  -Uri http://localhost:8000/__refresh
```

### Example: reseed products without restarting Gatsby

Start Gatsby once:

```powershell
cd C:\path\to\your\gatsby-project
$env:ENABLE_GATSBY_REFRESH_ENDPOINT="true"; npm run develop
```

In another PowerShell terminal, reseed MongoDB:

```powershell
cd C:\tools\python
python seed_more_products.py
```

Refresh Gatsby's data layer:

```powershell
curl.exe -X POST http://localhost:8000/__refresh
```

Reload the Products page in the browser.

### Example: test the empty database page

Clear MongoDB:

```powershell
cd C:\tools\python
python clear_db.py
```

Refresh Gatsby:

```powershell
curl.exe -X POST http://localhost:8000/__refresh
```

Reload the Products page. Gatsby should display the empty-database message without requiring the development server to be restarted.

> The refresh endpoint is intended for local development. Do not enable it on a public production server.

## Environment variables

Create an `.env.development` file in the project root:

```env
MONGODB_URI=mongodb://localhost:27017
```

Do not commit `.env.development` to GitHub.

You can commit an `.env.example` file instead:

```env
MONGODB_URI=mongodb://localhost:27017
```

## Install project dependencies

After cloning the repository, run:

```shell
npm install
```

## 🚀 Quick start

1. **Start the MongoDB Vagrant environment.**

   ```powershell
   cd C:\tools\vagrant\redhat-mongo
   vagrant up
   ```

2. **Start Gatsby development mode.**

   ```shell
   npm run develop
   ```

3. **Open the project.**

   Gatsby site:

   ```text
   http://localhost:8000
   ```

   Gatsby GraphiQL:

   ```text
   http://localhost:8000/___graphql
   ```

4. **Start customizing.**

   Edit files inside:

   ```text
   src/pages/
   src/components/
   src/styles/
   ```

## Available npm commands

Start Gatsby development mode:

```shell
npm run develop
```

Start Gatsby using the alternate start script:

```shell
npm start
```

Build the production site:

```shell
npm run build
```

Serve the production build:

```shell
npm run serve
```

Clear Gatsby cache and generated files:

```shell
npm run clean
```

## Empty MongoDB collection support

Gatsby normally infers GraphQL types from available data. If the MongoDB collection is empty, Gatsby may not automatically create the product GraphQL type.

This project defines the product type in `gatsby-node.js`:

```js
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type MongodbMyGatsbyDbProducts implements Node {
      name: String
      price: Float
      description: String
    }
  `)
}
```

This allows the Products page query to remain valid even when the MongoDB collection contains no records.

When the database is empty, the page displays an empty-store message instead of failing.

## GraphQL product query

The Products page uses a Gatsby GraphQL query similar to:

```graphql
query ProductsPageQuery {
  allMongodbMyGatsbyDbProducts {
    nodes {
      id
      name
      price
      description
    }
  }
}
```

You can test Gatsby queries through GraphiQL:

```text
http://localhost:8000/___graphql
```

## Project structure

```text
project-root/
├── blog/
├── src/
│   ├── components/
│   │   ├── layout.js
│   │   └── Seo.js
│   ├── images/
│   ├── pages/
│   │   ├── 404.js
│   │   ├── about.js
│   │   ├── blog.js
│   │   ├── index.js
│   │   └── products.js
│   └── styles/
│       └── global.css
├── .env.example
├── .gitignore
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── package.json
├── postcss.config.js
└── README.md
```

## Troubleshooting

### Gatsby cannot query the MongoDB products field

Example error:

```text
Cannot query field "allMongodbMyGatsbyDbProducts" on type "Query".
```

Confirm that `gatsby-node.js` contains the custom MongoDB product type.

Then clear the Gatsby cache and restart:

```shell
npm run clean
npm run develop
```

### Gatsby cannot connect to MongoDB

From the Vagrant folder, confirm that the VM is running:

```powershell
cd C:\tools\vagrant\redhat-mongo
vagrant status
```

Start it if necessary:

```shell
vagrant up
```

Check MongoDB inside the VM:

```shell
vagrant ssh
sudo systemctl status mongod
```

Confirm that port `27017` is forwarded:

```shell
vagrant port
```

Test the host connection:

```shell
mongosh "mongodb://localhost:27017"
```

### Vagrant provisioning failed

Run the provisioning script again:

```shell
vagrant provision
```

For a clean rebuild:

```shell
vagrant destroy -f
vagrant up
```

### Gatsby is using old data or styles

Clear Gatsby's cache:

```shell
npm run clean
npm run develop
```

## Files not committed to GitHub

The following files and directories should normally be included in `.gitignore`:

```gitignore
node_modules/
.cache/
public/
.vagrant/
.env
.env.development
.env.production
```

## Learn more

- [Gatsby Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Gatsby Tutorials](https://www.gatsbyjs.com/docs/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Gatsby Guides](https://www.gatsbyjs.com/docs/how-to/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Gatsby API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Gatsby Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Gatsby Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Vagrant Documentation](https://developer.hashicorp.com/vagrant/docs)
- [DaisyUI Documentation](https://daisyui.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🚀 Quick start with Netlify

Deploy the original Gatsby starter with one click on Netlify:

[<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" />](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-minimal)

> The local Vagrant MongoDB environment is intended for development. A Netlify deployment cannot connect to MongoDB running on your local computer. A deployed version would require a publicly reachable database service and a production environment variable.