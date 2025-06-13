#!/usr/bin/env python3
__author__ = 'deadblue'

import logging
logging.basicConfig(
    level=logging.DEBUG, datefmt='%Y-%m-%d %H:%M:%S',
    format='%(asctime)s - %(message)s'
)

import os.path as ospath
import sys


from builder.loader import load_source
from builder.composer import Composer


_logger = logging.getLogger(__name__)


def _print_usage(prog_name: str):
    print(f'Usage: {prog_name} <root-dir>')


def _build(root_dir: str):
    src_dir = ospath.join(root_dir, 'src')
    dist_dir = ospath.join(root_dir, 'dist')
    
    _logger.info('Loading source from: %s', src_dir)
    source = load_source(src_dir)

    _logger.info('Generating userscript ...')
    dist_file = ospath.join(dist_dir, 'i-want-sese.user.js')
    with Composer(dist_file) as c:
        c.compose(source)
    _logger.info('Done!')


def _main():
    if len(sys.argv) == 1:
        _print_usage(sys.argv[0])
    else:
        _build(sys.argv[1])

if __name__ == '__main__':
    _main()
